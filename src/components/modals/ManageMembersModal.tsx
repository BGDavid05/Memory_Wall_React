import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { useWallMembers, useUpdateMemberRole, useRemoveMember } from '../../hooks/useWalls';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/ToastContext';
import { formatDate } from '../../utils/formatters';

interface ManageMembersModalProps {
  open: boolean;
  onClose: () => void;
  wallId: string;
  wallName?: string;
  wallCreatorId?: string;
  onOpenInvite?: () => void;
}

export default function ManageMembersModal({
  open,
  onClose,
  wallId,
  wallName = '',
  wallCreatorId = '',
  onOpenInvite = undefined,
}: ManageMembersModalProps) {
  const { user } = useAuth();
  const { data: members, isLoading, error } = useWallMembers(wallId);
  const updateRoleMutation = useUpdateMemberRole();
  const removeMemberMutation = useRemoveMember();
  const toast = useToast();

  const [updatingMemberId, setUpdatingMemberId] = useState<string | null>(null);

  const handleRoleChange = async (memberId: string, userId: string, newRole: 'admin' | 'viewer') => {
    try {
      setUpdatingMemberId(userId);
      await updateRoleMutation.mutateAsync({ wallId, userId: memberId, role: newRole });
      toast.success('Role Updated', `Member role has been updated to ${newRole}`);
    } catch (err: unknown) {
      const errorData = err as { response?: { data?: { message?: string } } };
      toast.error('Update Failed', errorData.response?.data?.message || 'Unable to update member role');
    } finally {
      setUpdatingMemberId(null);
    }
  };

  const handleRemoveMember = async (userId: string, userName: string) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Are you sure you want to remove ${userName} from this wall?`)) {
      return;
    }

    try {
      await removeMemberMutation.mutateAsync({ wallId, userId });
      toast.success('Member Removed', `${userName} has been removed from the wall`);
    } catch (err: unknown) {
      const errorData = err as { response?: { data?: { message?: string } } };
      toast.error('Remove Failed', errorData.response?.data?.message || 'Unable to remove member');
    }
  };

  const handleInviteClick = () => {
    onClose();
    if (onOpenInvite) {
      onOpenInvite();
    }
  };

  const isWallCreator = (userId: string) => {
    return wallCreatorId === userId;
  };

  const isCurrentUserCreator = user && wallCreatorId === user.id;

  const canModifyMember = (memberUserId: string, memberRole: string) => {
    if (!user) return false;
    // User cannot modify themselves
    if (memberUserId === user.id) return false;
    // Cannot modify the wall creator
    if (isWallCreator(memberUserId)) return false;

    // Creator can modify everyone (except themselves)
    if (isCurrentUserCreator) return true;

    // Admin can only modify viewers, not other admins
    if (memberRole === 'admin') return false;

    return true;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">Manage Members</Typography>
            {wallName && (
              <Typography variant="caption" color="text.secondary">
                {wallName}
              </Typography>
            )}
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        )}
        {!isLoading && error && <Alert severity="error">Failed to load members</Alert>}
        {!isLoading && !error && (!members || members.length === 0) && (
          <Box textAlign="center" py={4}>
            <Typography color="text.secondary">No members found</Typography>
          </Box>
        )}
        {!isLoading && !error && members && members.length > 0 && (
          <List>
            {members.map((member) => {
              const isCreator = isWallCreator(member.userId);
              const canModify = canModifyMember(member.userId, member.role);
              const isUpdating = updatingMemberId === member.userId;

              return (
                <ListItem key={member._id} divider>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography>{member.userName}</Typography>
                        {isCreator && <Chip label="Creator" size="small" color="primary" />}
                        {member.userId === user?.id && <Chip label="You" size="small" variant="outlined" />}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {member.userEmail}
                        </Typography>
                        <br />
                        <Typography component="span" variant="caption" color="text.secondary">
                          Joined {formatDate(member.createdAt)}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box display="flex" alignItems="center" gap={1}>
                      {isUpdating && <CircularProgress size={24} />}
                      {!isUpdating && (member.userId === user?.id || isCreator) && (
                        <Chip
                          label={member.role}
                          size="small"
                          color={member.role === 'admin' ? 'primary' : 'default'}
                        />
                      )}
                      {!isUpdating && member.userId !== user?.id && !isCreator && (
                        <>
                          <Select
                            value={member.role}
                            onChange={(e) =>
                              handleRoleChange(member._id, member.userId, e.target.value as 'admin' | 'viewer')
                            }
                            size="small"
                            disabled={!canModify}
                            sx={{ minWidth: 100 }}
                          >
                            <MenuItem value="viewer">Viewer</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                          </Select>
                          {canModify && (
                            <IconButton
                              onClick={() => handleRemoveMember(member.userId, member.userName)}
                              color="error"
                              size="small"
                              disabled={removeMemberMutation.isPending}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </>
                      )}
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        {onOpenInvite && (
          <Button onClick={handleInviteClick} variant="outlined" startIcon={<PersonAddIcon />} sx={{ mr: 'auto' }}>
            Invite User
          </Button>
        )}
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
