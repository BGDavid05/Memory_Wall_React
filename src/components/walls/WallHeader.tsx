import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '../../utils/formatters';

interface WallHeaderProps {
  name: string;
  // eslint-disable-next-line react/require-default-props
  description?: string;
  createdByName: string;
  totalMemories: number;
  createdAt: string;
  coverImage: string | null;
  canEdit: boolean;
  onAddMemory: () => void;
  onInvite: () => void;
  onManageMembers: () => void;
  onEditWall: () => void;
}

const WallHeader = React.memo(
  ({
    name,
    description = '',
    createdByName,
    totalMemories,
    createdAt,
    coverImage,
    canEdit,
    onAddMemory,
    onInvite,
    onManageMembers,
    onEditWall,
  }: WallHeaderProps) => {
    return (
      <Box
        sx={{
          position: 'relative',
          height: 300,
          mb: 4,
          borderRadius: 2,
          overflow: 'hidden',
          background: coverImage ? `url(${coverImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {coverImage && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0, 0, 0, 0.4)',
            }}
          />
        )}
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            p: 3,
          }}
        >
          <Box flex={1} sx={{ minWidth: 0, mr: 2 }}>
            <Typography
              variant="h3"
              color="white"
              fontWeight="bold"
              gutterBottom
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Typography>
            {description && (
              <Typography
                variant="h6"
                color="rgba(255, 255, 255, 0.9)"
                gutterBottom
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  wordBreak: 'break-word',
                  lineHeight: 1.4,
                }}
              >
                {description}
              </Typography>
            )}
            <Box display="flex" gap={2} color="rgba(255, 255, 255, 0.9)" flexWrap="wrap">
              <Typography noWrap>by {createdByName || 'Unknown'}</Typography>
              <Typography>•</Typography>
              <Typography noWrap>{totalMemories} memories</Typography>
              <Typography>•</Typography>
              <Typography noWrap>{formatDate(createdAt)}</Typography>
            </Box>
          </Box>
          <Box display="flex" gap={1} flexWrap="wrap">
            {canEdit && (
              <>
                <Button variant="contained" startIcon={<AddIcon />} onClick={onAddMemory}>
                  Add Memory
                </Button>
                <Button variant="contained" startIcon={<PersonAddIcon />} onClick={onInvite}>
                  Invite
                </Button>
                <Button variant="contained" startIcon={<PeopleIcon />} onClick={onManageMembers}>
                  Members
                </Button>
                <Button variant="contained" startIcon={<EditIcon />} onClick={onEditWall}>
                  Edit Wall
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  },
);

WallHeader.displayName = 'WallHeader';

export default WallHeader;
