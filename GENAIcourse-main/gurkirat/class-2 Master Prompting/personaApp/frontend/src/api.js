// const API_URL = `http://localhost:3000/api/chat`;

// export async function getModelResponse(personaPrompt, userMessage) {
//     try {
//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ personaPrompt, userMessage })
//         });

//         if (!response.ok) {
//             throw new Error(`API request failed with status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data.content;
//     } catch (error) {
//         console.error('Error calling API:', error);
//         throw new Error('Failed to get response from API');
//     }
// }





const API_URL = `http://localhost:3000/api/chat`;

export async function getModelResponse(messages) {    
    // Check if messages array is not empty
    if (messages.length === 0) {
        console.error("Messages array is empty.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages })  // sending whole conversation array
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("API response error text:", errText);
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Error calling API:', error);
        throw new Error('Failed to get response from API');
    }
}


