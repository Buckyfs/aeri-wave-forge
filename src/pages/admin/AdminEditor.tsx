import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { api } from '@/lib/api';
import type { CMSContent } from '@/types/database';

const contentSchema = z.object({
  content: z.string().min(1, 'Content cannot be empty'),
});

export default function AdminEditor() {
  const { section } = useParams<{ section: string }>();
  const [content, setContent] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof contentSchema>>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content: '',
    },
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('aeri_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    loadContent();
  }, [section, navigate]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await api.getAllCMSContent();
      const sectionContent = data.filter(item => 
        item.section_key.startsWith(section + '_')
      );
      setContent(sectionContent);
    } catch (err) {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item: CMSContent, newContent: string) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.updateCMSContent(item.section_key, newContent);
      setSuccess(`${item.title} updated successfully!`);
      
      // Update local state
      setContent(prev => prev.map(c => 
        c.id === item.id ? { ...c, content: newContent } : c
      ));
      
      // Auto-hide success message
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Failed to update ${item.title}`);
    } finally {
      setSaving(false);
    }
  };

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      'hero': 'Hero Section',
      'about': 'About Section', 
      'impact': 'Impact Metrics',
      'footer': 'Footer Content'
    };
    return titles[section] || section;
  };

  const getSectionDescription = (section: string) => {
    const descriptions: Record<string, string> = {
      'hero': 'Edit the main banner content that visitors see first',
      'about': 'Manage information about AERI and your mission',
      'impact': 'Update statistics and impact numbers',
      'footer': 'Modify footer text and contact information'
    };
    return descriptions[section] || 'Edit content for this section';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {getSectionTitle(section || '')}
                </h1>
                <p className="text-sm text-gray-600">
                  {getSectionDescription(section || '')}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.open('/', '_blank')}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Alerts */}
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Content Items */}
        <div className="space-y-6">
          {content.length > 0 ? (
            content.map((item) => (
              <ContentEditor
                key={item.id}
                item={item}
                onSave={handleSave}
                saving={saving}
              />
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Content Available
                </h3>
                <p className="text-gray-600 mb-4">
                  The CMS database hasn't been set up yet. In production, 
                  you'll see editable content items here.
                </p>
                <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

// Individual content editor component
function ContentEditor({ 
  item, 
  onSave, 
  saving 
}: { 
  item: CMSContent; 
  onSave: (item: CMSContent, content: string) => void;
  saving: boolean;
}) {
  const [editContent, setEditContent] = useState(item.content);
  const [hasChanges, setHasChanges] = useState(false);

  const handleContentChange = (value: string) => {
    setEditContent(value);
    setHasChanges(value !== item.content);
  };

  const handleSave = () => {
    onSave(item, editContent);
    setHasChanges(false);
  };

  const handleReset = () => {
    setEditContent(item.content);
    setHasChanges(false);
  };

  const isTextArea = item.content_type === 'html' || item.content.length > 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <CardDescription>
              Section: {item.section_key} • Type: {item.content_type}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {hasChanges && (
              <Button variant="outline" size="sm" onClick={handleReset}>
                Reset
              </Button>
            )}
            <Button 
              size="sm" 
              onClick={handleSave}
              disabled={!hasChanges || saving}
            >
              {saving ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            {isTextArea ? (
              <Textarea
                value={editContent}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-[120px]"
                placeholder="Enter your content here..."
              />
            ) : (
              <Input
                value={editContent}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Enter your content here..."
              />
            )}
          </div>
          
          {hasChanges && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                ⚠️ You have unsaved changes. Click "Save" to apply them to your website.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}