import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../envorinments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.secret
    );
  }

  async upload(file:File, fileName:string, folderName:string = 'base'){
    const { error } = await this.supabase
      .storage
      .from('instapic')
      .upload(`${folderName}/${fileName}`, file);
    if(error){
      alert(error.message);
      return;
    }

    const { data } = await this.supabase
      .storage
      .from('instapic')
      .getPublicUrl(`${folderName}/${fileName}`)
    return data.publicUrl;
  }

}
