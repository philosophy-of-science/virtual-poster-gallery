import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rgsmkjtpmpncpkcatssr.supabase.co';
console.log(process.env, process.env.local);
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
