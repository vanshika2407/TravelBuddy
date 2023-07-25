const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.apikeyOpenAi,
});
const openai = new OpenAIApi(configuration);

module.exports.generateIternary = async (req, res) => {


    const { arrivalDate, departureDate, interests, place } = req.body;
    const startDate = new Date(arrivalDate);
    const endDate = new Date(departureDate);

    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: generatePrompt(startDate, endDate, interests, place),
            temperature: 0.45,
            top_p: 1,
            frequency_penalty: 2,
            presence_penalty: 0,
            max_tokens: 2000
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

function generatePrompt(arrivalDate, departureDate, interests, place) {
    return `Prepare a daywise trip schedule for ${place}, based on the following information:

  * Arrival To: ${place}
  * Arrival Date: ${arrivalDate.toDateString()}
  * Departure From: ${place}
  * Departure Date: ${departureDate.toDateString()}
  * Additional Notes: These are my interests ${interests}
  * 
  * 
  *`;
}
// Prepare a daywise trip schedule for ${place}, based on the following information

//  give complete details for all the days of the trip like what to do on each day and at what time