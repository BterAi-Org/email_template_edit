const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the index.html file
app.use(express.static(path.join(__dirname, '.')));

// Read the index.html file
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

app.post('/api/edit', async (req, res) => {
  const message = req.body.message;
  const configuration = new Configuration({
    apiKey: "",
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createEdit({
      model: "text-davinci-edit-001",
      input: indexHtml, // Pass the index.html content as a string
      instruction: `${message}`,
      temperature: 0.7,
      top_p: 1,
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the request.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
