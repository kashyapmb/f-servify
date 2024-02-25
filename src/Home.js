import { Box, Button } from "@mui/material"
import Header from "./components/Header"
import Slider from "./components/Slider"
import UserType from "./components/UserType"

function Home() {
	return (
		<>
			<Box
				sx={{
					background: "#f2f2f7",
					height: "100vh",
				}}
			>
				<Box
					sx={{
						paddingX: { sm: "5rem", md: "10rem", lg: "15rem" },
						paddingY: "1rem",
					}}
				>
					<Header />
					<Slider />
                    <UserType />
				</Box>
			</Box>
		</>
	)
}

export default Home
