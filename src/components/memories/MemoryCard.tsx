import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Box, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDate } from '../../utils/formatters';
import type { Memory } from '../../types/memory';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

const MemoryCard = React.memo(({ memory, onClick }: MemoryCardProps) => {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        borderRadius: 2.5,
        width: 300,
        minWidth: 300,
        maxWidth: 300,
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
          transition: 'all 0.2s',
        },
        borderAllRadius: 26,
      }}
      onClick={onClick}
    >
      {memory.assets && memory.assets.length > 0 ? (
        <CardMedia component="img" height="200" image={memory.assets[0].url} alt={memory.title} />
      ) : (
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          }}
        >
          <FavoriteIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
        </Box>
      )}

      <CardContent sx={{ pb: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}
        >
          {memory.title}
        </Typography>
        {memory.content && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-word',
              minHeight: 40,
            }}
          >
            {memory.content}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, mt: 'auto' }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '40%',
          }}
        >
          {formatDate(memory.memoryDate)}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} sx={{ maxWidth: '60%' }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            by {memory.createdBy.name}
          </Typography>
          {memory.assets && memory.assets.length > 1 && (
            <Chip label={`+${memory.assets.length - 1}`} size="small" sx={{ height: 20, flexShrink: 0 }} />
          )}
        </Box>
      </CardActions>
    </Card>
  );
});

MemoryCard.displayName = 'MemoryCard';

export default MemoryCard;
