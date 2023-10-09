import crypto from 'crypto';

type Data = {
    algorithm: string;
    expires: number;
    issued_at: number;
    user_id: string;
};

export const parseSignedFacebookRequest = (signed_request: string) => {
    const [encoded_sig, payload] = signed_request.split('.');

    const secret = process.env.FACEBOOK_APP_SECRET;

    const sig = base64Decode(encoded_sig);
    const data = JSON.parse(base64Decode(payload)) as Data;

    const expected_sig = crypto.createHmac('sha256', secret).update(payload).digest('binary');

    if (sig !== expected_sig) {
        throw Error('Bad Signed JSON signature!');
    }

    return data;
};

const base64Decode = (input: string) => {
    return Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('binary');
};
