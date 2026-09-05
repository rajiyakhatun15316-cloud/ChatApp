import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import CreatePost from './CreatePost';
import Post from './Post';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/api/posts/timeline');
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterTabs = ["All Post", "For You"];

  return (
    <Container maxWidth="sm" sx={{ p: { xs: 0, sm: 2 } }}>
      <CreatePost onPostCreated={fetchPosts} />
      
      {/* Filters Row */}
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', mb: 2, pb: 1, px: { xs: 1.5, sm: 0 }, '::-webkit-scrollbar': { display: 'none' } }}>
        {filterTabs.map((tab, idx) => (
          <Button
            key={idx}
            variant={idx === 0 ? "outlined" : "text"}
            size="small"
            sx={{
              borderRadius: 5,
              whiteSpace: 'nowrap',
              color: idx === 0 ? '#0b7beb' : '#8b949e',
              borderColor: idx === 0 ? '#0b7beb' : 'transparent',
              bgcolor: idx === 0 ? 'rgba(11, 123, 235, 0.1)' : 'transparent',
              border: idx !== 0 ? '1px solid #21262d' : '1px solid #0b7beb'
            }}
          >
            {tab}
          </Button>
        ))}
      </Box>

      {/* Posts List */}
      <Box>
        {posts.map((post) => (
          <Post key={post._id} post={post} currentUser={user} onUpdate={fetchPosts} />
        ))}
        {posts.length === 0 && (
          <Typography textAlign="center" color="textSecondary" mt={4}>
            No posts yet. Be the first to share something!
          </Typography>
        )}
      </Box>
    </Container>
  );
}
