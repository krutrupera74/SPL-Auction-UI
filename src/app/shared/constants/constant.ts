export class Constants {
    public static currentUserObject = 'currentUser';
    public static secretKey = '6696D2E6F042FEC4D6E3F32AD541143B';
    public static registrationEmailSubject = 'Confirmation of Registration: {{tournamentName}}';
    public static registrationEmailBody = `
    <div>
        <p>Dear {{playerName}},</p>
        <p>We hope this email finds you well.</p>
        <p>We are writing to confirm your registration for the upcoming <strong>{{tournamentName}}</strong>.
        We are thrilled to have you participate in this event, and we believe your skills and enthusiasm will contribute to making it a memorable competition.</p>
        <p>Here are the key details you need to know:</p>
        <ul>
            <li><strong>Tournament Name:</strong> {{tournamentName}}</li>
            <li><strong>Tournament Start Date:</strong> {{tournamentDate}}</li>
            <li><strong>Venue:</strong> {{tournamentVenue}}</li>
        </ul>
        <p>
        Please make sure to mark your calendar and be prepared to compete on the specified date.
        </p>
        <p>
        Once again, thank you for your participation, and we wish you the best of luck in the upcoming tournament. Let's make it a memorable and enjoyable experience for all!
        </p>
    </div>`;
}