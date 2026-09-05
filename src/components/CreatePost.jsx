import { Box, Paper, Typography, TextField, Button, IconButton, Divider } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CampaignIcon from '@mui/icons-material/Campaign';
import SendIcon from '@mui/icons-material/Send';
import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api';

export default function CreatePost({ onPostCreated }) {
  const { user } = useContext(AuthContext);
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!desc && !image) return;
    try {
      await API.post('/api/posts', { desc, img: image });
      setDesc('');
      setImage(null);
      setPreview(null);
      onPostCreated();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, borderRadius: { xs: 0, sm: 3 }, border: 'none' }}>
      
      {/* Top Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
        <Typography variant="h6" fontWeight="bold">Create Post</Typography>
        <Box display="flex" gap={1} bgcolor="#0d1117" p={0.5} borderRadius={5} border="1px solid #21262d">
          <Button variant="contained" size="small" sx={{ borderRadius: 5, px: { xs: 1, sm: 2 }, py: 0.5, fontSize: { xs: 11, sm: 13 } }}>All Posts</Button>
          <Button variant="text" size="small" sx={{ borderRadius: 5, px: { xs: 1, sm: 2 }, py: 0.5, color: '#8b949e', fontSize: { xs: 11, sm: 13 } }}>Promotions</Button>
        </Box>
      </Box>

      {/* Input Area */}
      <Box mb={2}>
        <TextField
          placeholder="What's on your mind?"
          variant="standard"
          fullWidth
          multiline
          minRows={2}
          InputProps={{ disableUnderline: true, style: { fontSize: '1rem', padding: '10px 0' } }}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </Box>

      {preview && (
        <Box mb={2} position="relative">
          <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: 8, maxHeight: 400, objectFit: 'cover' }} />
          <Button 
            variant="contained" 
            color="error" 
            size="small" 
            sx={{ position: 'absolute', top: 8, right: 8, minWidth: 'auto', p: 1 }}
            onClick={() => { setImage(null); setPreview(null); }}
          >
            X
          </Button>
        </Box>
      )}

      <Divider sx={{ mb: 2, borderColor: '#21262d' }} />
      
      {/* Action Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
        <Box display="flex" gap={{ xs: 0, sm: 1 }} alignItems="center">
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <IconButton color="primary" onClick={() => fileInputRef.current.click()} size="small" sx={{ p: { xs: 0.5, sm: 1 } }}>
            <PhotoCamera />
          </IconButton>
          <IconButton color="primary" size="small" sx={{ p: { xs: 0.5, sm: 1 } }}>
            <EmojiEmotionsOutlinedIcon />
          </IconButton>
          <IconButton color="primary" size="small" sx={{ p: { xs: 0.5, sm: 1 } }}>
            <FormatListBulletedIcon />
          </IconButton>
          <Button startIcon={<CampaignIcon />} sx={{ color: '#0b7beb', fontWeight: 'bold', display: { xs: 'none', sm: 'flex' } }}>
            Promote
          </Button>
        </Box>
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          sx={{ 
            borderRadius: 5, 
            px: 3, 
            color: '#fff', 
            borderColor: '#fff',
            '&:hover': { borderColor: '#0b7beb', color: '#0b7beb' }
          }}
          onClick={handlePost}
          disabled={!desc && !image}
        >
          Post
        </Button>
      </Box>
    </Paper>
  );
}
