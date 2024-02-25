import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function Recovered() {
	const navigate = useNavigate()
	const navigateToProviderHomePage = () => [navigate("/providerhome")]
	return (
		<>
			<Box
				sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
			>
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
					width={700}
					alt="Sample image"
				/>
				<Box sx={{ fontSize: "1.4rem", fontWeight: "600", mt: "2rem" }}>
					New Password succesfully set
				</Box>
				<Box
					sx={{
						textDecoration: "underline",
						cursor: "pointer",
						fontSize: "1.2rem",
					}}
					onClick={navigateToProviderHomePage}
				>
					go to Home Page
				</Box>
			</Box>
		</>
	)
}

export default Recovered
