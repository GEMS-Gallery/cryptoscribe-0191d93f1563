import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

interface Post {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.id.toString()} component={Paper} sx={{ mb: 2, p: 2 }}>
          <ListItemText
            primary={
              <Typography variant="h6" component="h2">
                {post.title}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body2" color="text.secondary">
                  By {post.author} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {post.body}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
