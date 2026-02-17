import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useInviteUser } from '../../hooks/useWalls';
import { useToast } from '../../contexts/ToastContext';

interface InviteUserModalProps {
  open: boolean;
  onClose: () => void;
  wallId: string;
}

export default function InviteUserModal({ open, onClose, wallId }: InviteUserModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'viewer'>('viewer');
  const [emailError, setEmailError] = useState('');

  const inviteMutation = useInviteUser();
  const toast = useToast();

  const validateEmail = (value: string): boolean => {
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleClose = () => {
    setEmail('');
    setRole('viewer');
    setEmailError('');
    onClose();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    if (value && emailError) {
      validateEmail(value);
    }
    if (!value) {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    try {
      await inviteMutation.mutateAsync({
        wallId,
        data: {
          email: email.trim(),
          role,
        },
      });

      toast.success('Invitation Sent', `Invitation sent to ${email} as ${role}`);
      handleClose();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error('Invitation Failed', err.response?.data?.message || 'Unable to send invitation');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Invite User to Wall</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => email && validateEmail(email)}
              error={!!emailError}
              helperText={emailError}
              placeholder="Enter user's email address"
              required
              fullWidth
              autoFocus
            />

            <FormControl fullWidth>
              <InputLabel>Access Level</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'viewer')} label="Access Level">
                <MenuItem value="viewer">Viewer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <Alert severity="info" variant="outlined">
              <Typography variant="body2" gutterBottom>
                <strong>Viewer:</strong> Can view memories and add new ones
              </Typography>
              <Typography variant="body2">
                <strong>Admin:</strong> Can manage wall settings and invite others
              </Typography>
            </Alert>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={inviteMutation.isPending ? <CircularProgress size={20} /> : <SendIcon />}
            disabled={inviteMutation.isPending}
          >
            {inviteMutation.isPending ? 'Sending...' : 'Send Invitation'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
