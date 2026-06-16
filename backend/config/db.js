const connectDB = async () => {
  try {
    // Mock database array ko globally initialize karna
    global.mockDatabase = [
      { id: 1, name: "Rahul Sharma", purpose: "Meeting", status: "Active" },
      { id: 2, name: "Amit Kumar", purpose: "Delivery", status: "Active" },
    ];

    console.log("MongoDB Mock Database Connected successfully");
    // Yahan process.exit() nahi hona chahiye taaki server chalta rahe!
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
