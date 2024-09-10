import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { backend } from 'declarations/backend';
import PostList from './components/PostList';
import NewPostModal from './components/NewPostModal';

interface Post {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (title: string, body: string, author: string) => {
    try {
      await backend.createPost(title, body, author);
      await fetchPosts();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crypto Blog
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{ mb: 2 }}
        >
          New Post
        </Button>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <PostList posts={posts} />
        )}
        <NewPostModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePost}
        />
      </Box>
    </Container>
  );
}

export default App;
