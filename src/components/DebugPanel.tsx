import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function DebugPanel() {
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const [formTestStatus, setFormTestStatus] = useState<string>('');
  const [envInfo, setEnvInfo] = useState<string>('');

  const testConnection = async () => {
    setConnectionStatus('Testing connection...');

    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .limit(1);

      if (error) {
        setConnectionStatus(`❌ Connection failed: ${error.message}`);
        console.error('Connection error:', error);
      } else {
        setConnectionStatus('✅ Connection successful!');
        console.log('Connection successful:', data);
      }
    } catch (err) {
      setConnectionStatus(`❌ Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Connection error:', err);
    }
  };

  const testFormSubmission = async () => {
    setFormTestStatus('Testing form submission...');

    const testData = {
      organization_name: 'Debug Test Org',
      contact_name: 'Debug Test Contact',
      email: 'debug@test.com',
      partnership_type: 'business' as const,
      message: 'This is a debug test from production'
    };

    try {
      console.log('Submitting test data:', testData);

      const { data, error } = await supabase
        .from('partners')
        .insert([testData])
        .select()
        .single();

      if (error) {
        setFormTestStatus(`❌ Form submission failed: ${error.message}`);
        console.error('Form submission error:', error);
      } else {
        setFormTestStatus(`✅ Form submission successful! ID: ${data.id}`);
        console.log('Form submission successful:', data);

        // Clean up test data
        await supabase
          .from('partners')
          .delete()
          .eq('email', 'debug@test.com');
      }
    } catch (err) {
      setFormTestStatus(`❌ Form submission error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Form submission error:', err);
    }
  };

  const checkEnvironment = () => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    setEnvInfo(`
      Supabase URL: ${url || 'NOT SET'}
      Supabase Key: ${key ? `${key.substring(0, 20)}...` : 'NOT SET'}
      Environment: ${import.meta.env.MODE}
    `);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '300px',
      background: '#f0f0f0',
      padding: '15px',
      borderRadius: '8px',
      border: '2px solid #007bff',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>🔧 Debug Panel</h3>

      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={checkEnvironment}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '5px'
          }}
        >
          Check Env
        </button>
        <button
          onClick={testConnection}
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '5px'
          }}
        >
          Test Connection
        </button>
        <button
          onClick={testFormSubmission}
          style={{
            background: '#ffc107',
            color: 'black',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Form
        </button>
      </div>

      {envInfo && (
        <div style={{
          background: '#e9ecef',
          padding: '8px',
          borderRadius: '4px',
          marginBottom: '10px',
          whiteSpace: 'pre-wrap',
          fontSize: '10px'
        }}>
          <strong>Environment Variables:</strong>
          {envInfo}
        </div>
      )}

      {connectionStatus && (
        <div style={{
          background: connectionStatus.includes('❌') ? '#f8d7da' : '#d4edda',
          color: connectionStatus.includes('❌') ? '#721c24' : '#155724',
          padding: '8px',
          borderRadius: '4px',
          marginBottom: '10px',
          fontSize: '10px'
        }}>
          <strong>Connection:</strong> {connectionStatus}
        </div>
      )}

      {formTestStatus && (
        <div style={{
          background: formTestStatus.includes('❌') ? '#f8d7da' : '#d4edda',
          color: formTestStatus.includes('❌') ? '#721c24' : '#155724',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '10px'
        }}>
          <strong>Form Test:</strong> {formTestStatus}
        </div>
      )}
    </div>
  );
}
