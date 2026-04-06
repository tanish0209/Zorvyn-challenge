import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 5001;
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception at top level:", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});

process.on("exit", (code) => {
    console.log(`Process is exiting with code: ${code}`);
});

const startServer = () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        server.on("error", (error: any) => {
            if (error.code === "EADDRINUSE") {
                console.error(`Port ${PORT} is already in use.`);
            } else {
                console.error("Server error:", error);
            }
            process.exit(1);
        });
    } catch (error) {
        console.error("Failed to start server synchronously:", error);
        process.exit(1);
    }
};

startServer();
