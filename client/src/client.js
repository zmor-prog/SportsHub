import { createClient } from '@supabase/supabase-js'

const URL = 'https://hhcwsqtqfqrfjcdknfcq.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoY3dzcXRxZnFyZmpjZGtuZmNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzODc3MjgsImV4cCI6MTk5Nzk2MzcyOH0.HUbOzA95Cv5HFOqCL4sqGpNq4b5IzdzZxJ5_UZy08QU'
export const supabase = createClient(URL, API_KEY);  