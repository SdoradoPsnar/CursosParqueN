import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";

@Injectable({providedIn:  'root'})

export class UsersService {
  private supabase: SupabaseClient
  constructor(){
    this.supabase= createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY)
  }

  async userList (){
    let { data: users, error } = await this.supabase
    .from('users')
    .select('*')
    return {users, error}
  }

  async userDelete(id: number) {
    const { error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);
    return { error };
  }

}
