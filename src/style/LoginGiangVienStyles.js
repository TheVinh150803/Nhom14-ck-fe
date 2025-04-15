// LoginGiangVienStyles.js
const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 2,
    },
    boxWrapper: {
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      width: { xs: "100%", md: "900px" },
      height: { xs: "auto", md: "500px" },
      boxShadow: 3,
      borderRadius: "10px",
      overflow: "hidden",
      bgcolor: "white",
    },
    leftSide: {
      width: { xs: "100%", md: "50%" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "30px",
    },
    logo: {
      width: "80px",
      height: "80px",
      mb: 2,
    },
    textField: {
      marginBottom: "15px",
    },
    passwordField: {
      marginBottom: "20px",
    },
    loginButton: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
    },
    navigateButtons: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
    },
    divider: {
      display: { xs: "none", md: "block" },
      width: "3px",
      bgcolor: "gray",
    },
    rightSide: {
      width: { xs: "100%", md: "50%" },
      height: { xs: "200px", md: "100%" },
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };
  
  export default styles;
  