import { supabaseAdmin } from '../../../lib/supabase'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileName = `${Date.now()}-${file.name}`
    const fileBuffer = await file.arrayBuffer()
    
    const { data, error } = await supabaseAdmin.storage
      .from('order-images')
      .upload(fileName, fileBuffer, {
        contentType: file.type
      })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('order-images')
      .getPublicUrl(fileName)
    
    return Response.json({ url: publicUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}