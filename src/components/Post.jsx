import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, IconButton, Box, Divider, TextField, Button } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Comment from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useState } from 'react';
import moment from 'moment';
import API from '../api';

export default function Post({ post, currentUser, onUpdate }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser.username));
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = async () => {
    try {
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
      await API.put(`/posts/${post._id}/like`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    const newComment = { username: currentUser.username, text: commentText };
    try {
      post.comments = [...(post.comments || []), newComment];
      setCommentText('');
      await API.post(`/posts/${post._id}/comment`, { text: newComment.text });
      onUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card sx={{ mb: { xs: 1, sm: 3 }, borderRadius: { xs: 0, sm: 3 }, boxShadow: 'none', position: 'relative', border: { xs: 'none', sm: '1px solid #ffca28' }, borderTop: { xs: '1px solid #21262d', sm: '1px solid #ffca28' }, borderBottom: { xs: '1px solid #21262d', sm: '1px solid #ffca28' }, overflow: 'visible' }}>
      
      {/* Pin Icon overlay */}
      <Box sx={{ position: 'absolute', top: -10, right: -10, bgcolor: '#fff', borderRadius: '50%', p: 0.5, zIndex: 1, boxShadow: 2, display: 'flex' }}>
        <PushPinIcon sx={{ color: '#d32f2f', fontSize: 18, transform: 'rotate(45deg)' }} />
      </Box>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#0b7beb', width: 45, height: 45 }}>
            {post.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Button variant="outlined" size="small" sx={{ borderRadius: 5, color: '#0b7beb', borderColor: '#0b7beb', textTransform: 'none', px: 2 }}>
              Follow
            </Button>
            <IconButton sx={{ color: '#8b949e' }}>
              <MoreHorizIcon />
            </IconButton>
          </Box>
        }
        title={
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography fontWeight="bold" fontSize="1rem">{post.username}</Typography>
            <Box bgcolor="#ea8a39" color="#fff" px={1} borderRadius={4} fontSize="0.7rem" display="flex" alignItems="center">
              MVP
            </Box>
          </Box>
        }
        subheader={<Typography variant="caption" color="textSecondary">@{post.username.toLowerCase()} • {moment(post.createdAt).fromNow()}</Typography>}
        sx={{ pb: 0 }}
      />
      
      <CardContent sx={{ pt: 1 }}>
        {post.desc && <Typography variant="body1" mb={2} sx={{ fontSize: '0.95rem' }}>{post.desc}</Typography>}
        {post.img && (
          <Box mt={2}>
            <img src={post.img} alt="Post" style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 8, border: '1px solid #21262d' }} />
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderColor: '#21262d', mx: 2 }} />

      <CardActions sx={{ px: 2, py: 1.5, justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={3}>
          <Box display="flex" alignItems="center" gap={0.5} sx={{ cursor: 'pointer' }} onClick={handleLike}>
            {isLiked ? <Favorite sx={{ color: '#f44336' }} /> : <FavoriteBorder sx={{ color: '#8b949e' }} />}
            <Typography variant="body2" color="textSecondary">{like}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5} sx={{ cursor: 'pointer' }} onClick={() => setShowComments(!showComments)}>
            <Comment sx={{ color: '#8b949e' }} />
            <Typography variant="body2" color="textSecondary">{post.comments?.length || 0}</Typography>
          </Box>
        </Box>
      </CardActions>
      
      {showComments && (
        <Box px={2} pb={2}>
          <Divider sx={{ mb: 2, borderColor: '#21262d' }} />
          <Box maxHeight={200} overflow="auto" mb={2}>
            {post.comments?.map((c, i) => (
              <Box key={i} mb={1.5} display="flex" gap={1.5}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: '#0b7beb', fontSize: 14 }}>
                  {c.username.charAt(0).toUpperCase()}
                </Avatar>
                <Box bgcolor="#1a1f2c" px={2} py={1} borderRadius={2} border="1px solid #21262d">
                  <Typography variant="subtitle2" fontWeight="bold">
                    {c.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {c.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box display="flex" gap={1}>
            <TextField
              size="small"
              fullWidth
              placeholder="Write a comment..."
              variant="outlined"
              sx={{ 
                '& .MuiOutlinedInput-root': { borderRadius: 5, bgcolor: '#1a1f2c' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#21262d' }
              }}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
            />
            <Button variant="contained" sx={{ borderRadius: 5, px: 3 }} onClick={handleComment} disabled={!commentText.trim()}>
              Send
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
}
