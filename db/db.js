'use strict';

//CONNECT TO DATABASE
const SUPABASE_URL = 'https://mqkyypcjodisjsotuscy.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xa3l5cGNqb2Rpc2pzb3R1c2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY3MjQyMDcsImV4cCI6MTk4MjMwMDIwN30.nPz5DFE8w_3IsTFn00cWWVFhx7iDA8nCV7pZW0bYAE4';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//GET TABLE DATA FROM DATABASE
export async function loadData() {
  const { data, error } = await db.from('cards').select();

  // console.log(data);
  // console.log(error);
  return data;
}

// loadData();

//SHOW DATA ON SCREEN

//ADD DATA TO DATABASE
//PASS THE CARD OBJECT TO SEND TO THE DATABASE
export async function insertData(cardObject) {
  const { data, error } = await db
    .from('cards')
    .insert([
      {
        name: cardObject.name, 
        cardImage: cardObject.image, 
        setName: cardObject.set, 
        type: cardObject.type, 
        colors: cardObject.color
      }
    ]);

  console.log(`this is the ${data}`);
  console.log(error);
}

//DELETE DATA FROM DATABASE
async function deleteData() {
  const { error } = await db.from('cards').delete().eq('id', 1);
}

// deleteData();
