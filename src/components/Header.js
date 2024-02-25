import { Box, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

function Header() {
	const navigate = useNavigate()
	const navigateHome = () => {
		navigate("/")
	}
	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center", gap: "5rem" }}>
				<img
					src="images/servifyLogo.png"
					style={{ width: "11rem", borderRadius: "1rem", cursor: "pointer" }}
					onClick={navigateHome}
				/>
				<Box
					onClick={navigateHome}
					sx={{
						fontSize: "1.2rem",
						color: "#004aad",
						cursor: "pointer",
						fontWeight: 600,
					}}
				>
					Home
				</Box>
			</Box>
		</>
	)
}

export default Header
