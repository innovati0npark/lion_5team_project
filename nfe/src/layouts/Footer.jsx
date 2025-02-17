import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#1F2937', color: 'white', py: 4 }}>
      
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              PetPals
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Teach the world online. Create an online video course, reach students across the globe, and earn money.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Company
            </Typography>
            <Box sx={{ mt: 1 }}>
              <MuiLink href="#" color="inherit" underline="hover">
                About Us
              </MuiLink>
              <br />
              <MuiLink href="#" color="inherit" underline="hover">
                Contact Us
              </MuiLink>
              <br />
              <MuiLink href="#" color="inherit" underline="hover">
                Careers
              </MuiLink>
              <br />
              <MuiLink href="#" color="inherit" underline="hover">
                Blog
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Support
            </Typography>
            <Box sx={{ mt: 1 }}>
              <MuiLink href="#" color="inherit" underline="hover">
                Help Center
              </MuiLink>
              <br />
              <MuiLink href="#" color="inherit" underline="hover">
                Safety Center
              </MuiLink>
              <br />
              <MuiLink href="#" color="inherit" underline="hover">
                Community Guidelines
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Legal
            </Typography>
            <Box sx={{ mt: 1 }}>
              <MuiLink href="#" color="inherit" underline="hover">
                Cookies Policy
              </MuiLink>
              <br />
              <MuiLink href="#" color="inherit" underline="hover">
                Privacy Policy
              </MuiLink>
              <br />
              <MuiLink href="#" color="inherit" underline="hover">
                Terms of Service
              </MuiLink>
              <br />
              <MuiLink href="#" color="inherit" underline="hover">
                Law Enforcement
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">&copy; 2024 PetPals, Inc.</Typography>
          <Box>
            <MuiLink href="https://github.com/G0LDF0X/lion_5team_project" color="inherit" underline="hover" sx={{ mr: 1 }}>
              <GitHubIcon sx={{ width: 24, height: 24 }} />
            </MuiLink>
            <MuiLink href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              <FacebookIcon sx={{ width: 24, height: 24 }} />
            </MuiLink>
            <MuiLink href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              <InstagramIcon sx={{ width: 24, height: 24 }} />
            </MuiLink>
            <MuiLink href="#" color="inherit" underline="hover">
              <i className="fas fa-globe mr-1"></i> English
            </MuiLink>
          </Box>
        </Box>
      
    </Box>
  );
}

export default Footer;