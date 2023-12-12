const authRole = (role) => (req, res, next) => {
	if (req.user.user.role !== role) {
	  return res.status(401).json({ msg: 'Not Allowed' });
	}
	next();
  };
  
  const ROLE = {
	ADMIN: 'ADMIN',
	USER: 'USER',
  };
  
  export default { authRole, ROLE };
  