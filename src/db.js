import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lykmqwxjewxxovbngukt.supabase.co';
console.log(process.env);
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
