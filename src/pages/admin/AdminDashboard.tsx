import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Edit, 
  LogOut, 
  Home, 
  Users, 
  FileText, 
  TrendingUp,
  Settings,
  Eye
} from 'lucide-react';
import { api } from '@/lib/api';
import type { CMSContent } from '@/types/database';

export default function AdminDashboard() {
  const [content, setContent] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('aeri_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Load CMS content
    loadContent();
  }, [navigate]);

  const loadContent = async () => {
    try {
      const data = await api.getAllCMSContent();
      setContent(data);
    } catch (error) {
      console.warn('Failed to load CMS content:', error);
      // Don't break the dashboard if CMS fails
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aeri_admin_token');
    navigate('/admin/login');
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const contentSections = [
    {
      key: 'hero',
      title: 'Hero Section',
      description: 'Main homepage banner content',
      icon: Home,
      items: content.filter(item => item.section_key.startsWith('hero_'))
    },
    {
      key: 'about',
      title: 'About Section',
      description: 'About page and company information',
      icon: FileText,
      items: content.filter(item => item.section_key.startsWith('about_'))
    },
    {
      key: 'impact',
      title: 'Impact Metrics',
      description: 'Statistics and impact numbers',
      icon: TrendingUp,
      items: content.filter(item => item.section_key.startsWith('impact_'))
    },
    {
      key: 'footer',
      title: 'Footer Content',
      description: 'Footer text and contact information',
      icon: Settings,
      items: content.filter(item => item.section_key.startsWith('footer_'))
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AERI Admin</h1>
              <p className="text-sm text-gray-600">Content Management System</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview Site
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back, Natalie! 👋</CardTitle>
              <CardDescription>
                Manage your website content easily. Click on any section below to edit the text, 
                images, and other content that appears on your website.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sections</p>
                  <p className="text-2xl font-bold">{content.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">
                    {content.filter(item => item.is_published).length}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-sm font-medium">
                    {content.length > 0 ? 'Today' : 'Never'}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Online
                  </Badge>
                </div>
                <Settings className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Content Sections</h2>
          
          {contentSections.map((section) => (
            <Card key={section.key}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <section.icon className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                  <Button onClick={() => navigate(`/admin/edit/${section.key}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Section
                  </Button>
                </div>
              </CardHeader>
              {section.items.length > 0 && (
                <CardContent>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-gray-600 truncate max-w-md">
                            {item.content.substring(0, 100)}...
                          </p>
                        </div>
                        <Badge variant={item.is_published ? "default" : "secondary"}>
                          {item.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}

          {content.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Found</h3>
                <p className="text-gray-600 mb-4">
                  The CMS database tables haven't been created yet. Once deployed, 
                  you'll be able to edit all website content from here.
                </p>
                <Badge variant="secondary">Development Mode</Badge>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}