
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

export async function GET(request) {
  try {
    if (!GOOGLE_SHEETS_API_KEY) {
        console.error("GOOGLE_SHEETS_API_KEY is not set in environment variables.");
        return NextResponse.json({ message: 'Server configuration error: API Key missing.' }, { status: 500 });
    }

    const sheets = google.sheets({
      version: 'v4',
      auth: GOOGLE_SHEETS_API_KEY, 
    });

    const spreadsheetId = '1-N3XcgzLYGdW8-4YT4JtUhYkkd6Yt2_AooKdqdilYE4';
    const range = 'Programacion!A1:L10'; 

    console.log(`Attempting to fetch data from Spreadsheet ID: ${spreadsheetId}, Range: ${range}`);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });


    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: 'No data found.' }, { status: 404 });
    }

    const headers = rows[0]; 
    const rawEvents = rows.slice(1).map(row => {
      const event = {};
      headers.forEach((header, index) => {
        event[header] = row[index] !== undefined ? row[index] : '';
      });
      return event;
    });

    const groupedProgramacion = rawEvents.reduce((acc, currentEvent) => {
      const eventDate = currentEvent.Fecha; 
      if (!eventDate) {
        console.warn('Skipping event due to missing Fecha:', currentEvent);
        return acc;
      }

      
      let dayEntry = acc.find(entry => entry.fecha === eventDate);

      if (!dayEntry) {
       
       
        const dayOfWeekMatch = eventDate.match(/^([A-Za-z]+),/);
        const dayOfWeek = dayOfWeekMatch ? dayOfWeekMatch[1] : '';

        dayEntry = {
          dia: dayOfWeek,             
          fecha: eventDate,           
          eventos: [],                
        };
        acc.push(dayEntry);
      }

      dayEntry.eventos.push(currentEvent);
      return acc;
    }, []);

    console.log('Data successfully processed and grouped by day (simplified).');
    return NextResponse.json({ data: groupedProgramacion });

  } catch (error) {
    console.error('Error in /api/sheets (API Key issue likely):', error);
    return NextResponse.json(
      { message: 'Error interno del servidor (posiblemente autenticación)', error: error.message },
      { status: 500 }
    );
  }
}