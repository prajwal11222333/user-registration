import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loginHistory, setLoginHistory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((res) => res.json())
      .then((data) => setLoginHistory(data.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogin = async () => {
    if (!firstName || !lastName || !email) {
      toast.error("All fields are required!");
      return;
    }

    const newUser = { first_name: firstName, last_name: lastName, email };
    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      setLoginHistory([...loginHistory, { ...data, id: loginHistory.length + 1, email }]);
      setFirstName("");
      setLastName("");
      setEmail("");

      toast.success("User added successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to add user!");
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedUserId) return;

    try {
      await fetch(`https://reqres.in/api/users/${selectedUserId}`, { method: "DELETE" });

      setLoginHistory(loginHistory.filter((user) => user.id !== selectedUserId));

      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user!");
    }

    handleCloseDeleteDialog();
  };

  const handleOpenEditDialog = (user) => {
    setSelectedUserId(user.id);
    setEditFirstName(user.first_name);
    setEditLastName(user.last_name);
    setEditEmail(user.email);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUserId(null);
  };

  const handleUpdateUser = () => {
    if (!editFirstName || !editLastName || !editEmail) {
      toast.error("Fields cannot be empty!");
      return;
    }

    setLoginHistory(
      loginHistory.map((user) =>
        user.id === selectedUserId
          ? { ...user, first_name: editFirstName, last_name: editLastName, email: editEmail }
          : user
      )
    );

    toast.success("User updated successfully!");
    handleCloseEditDialog();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <Grid container spacing={2} justifyContent="center">
        {/* Login Form */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, maxWidth: 400, mx: "auto", boxShadow: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>Login</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: "bold" }} onClick={handleLogin}>
              Login
            </Button>
          </Card>
        </Grid>

        {/* Login History */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, maxWidth: 600, mx: "auto", boxShadow: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>Login History</Typography>
            <Box sx={{ maxHeight: 300, overflowY: "auto", p: 1, borderRadius: 1, backgroundColor: "#fff", boxShadow: 1 }}>
              {loginHistory.map((user) => (
                <Grid container key={user.id} alignItems="center" spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={6}>
                    <Typography>{user.first_name} {user.last_name}</Typography>
                    <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Tooltip title="Edit User">
                      <IconButton color="primary" size="small" onClick={() => handleOpenEditDialog(user)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton color="error" size="small" onClick={() => handleOpenDeleteDialog(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="First Name" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
          <TextField fullWidth margin="normal" label="Last Name" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
          <TextField fullWidth margin="normal" label="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">Cancel</Button>
          <Button onClick={handleUpdateUser} color="success">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Login;