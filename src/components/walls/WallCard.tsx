import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import type { Wall, SharedWall } from '../../types/wall';
import { getGradientForWall } from '../../utils/colors';
import { formatRelativeDate } from '../../utils/formatters';

interface WallCardProps {
  wall: Wall | SharedWall;
  // eslint-disable-next-line react/require-default-props
  type?: 'my' | 'shared';
}

const WallCard = React.memo(({ wall, type = 'my' }: WallCardProps) => {
  const navigate = useNavigate();
  const isShared = 'role' in wall;

  const handleClick = () => {
    navigate(`/walls/${wall._id}`);
  };

  return (
    <Card
      sx={{
        width: 300,
        minWidth: 300,
        maxWidth: 300,
        height: 320,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2.5,
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
        borderAllRadius: 26,
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
        {/* Cover Image */}
        <Box
          sx={{
            height: 160,
            flexShrink: 0,
            background: wall.coverImage ? `url(${wall.coverImage}) center/cover` : getGradientForWall(wall.name, type),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!wall.coverImage && (
            <Typography variant="h2" color="white" fontWeight="bold">
              {wall.name.charAt(0).toUpperCase()}
            </Typography>
          )}
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography
              variant="h6"
              component="h3"
              noWrap
              sx={{
                flexGrow: 1,
                mr: 1,
                maxWidth: isShared ? 'calc(100% - 80px)' : '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {wall.name}
            </Typography>
            {isShared && (
              <Chip
                label={(wall as SharedWall).role}
                size="small"
                color={(wall as SharedWall).role === 'admin' ? 'primary' : 'default'}
                sx={{ flexShrink: 0 }}
              />
            )}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              mb: 2,
              minHeight: 60,
              lineHeight: 1.4,
            }}
          >
            {wall.description || 'No description'}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
            <Typography variant="caption" color="text.secondary">
              {isShared ? `by ${(wall as SharedWall).createdByName}` : formatRelativeDate(wall.createdAt)}
            </Typography>
            <Box display="flex" gap={2}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <FavoriteIcon fontSize="small" color="action" />
                <Typography variant="caption">{wall.memoryCount}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <PeopleIcon fontSize="small" color="action" />
                <Typography variant="caption">{wall.memberCount}</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

WallCard.displayName = 'WallCard';

export default WallCard;
