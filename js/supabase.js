(function () {
  const url = window.BREWBITE_SUPABASE_URL || 'https://ontcqouqfskmflrcllel.supabase.co';
  const anonKey = window.BREWBITE_SUPABASE_ANON_KEY || 'sb_publishable_TsSdFyk5f5PR2lLMLX16Vg_7gnsvjtR';

  const isConfigured = Boolean(url && anonKey);
  const client = isConfigured && window.supabase ? window.supabase.createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'brewBiteAuth'
    }
  }) : null;

  window.supabaseConfig = {
    enabled: isConfigured,
    note: isConfigured
      ? 'Supabase browser client initialized.'
      : 'Supabase project URL and anon key are not configured yet.'
  };

  window.supabaseClient = client;
  window.getSupabaseClient = function () {
    return client;
  };
  window.isSupabaseConfigured = function () {
    return isConfigured;
  };
})();
