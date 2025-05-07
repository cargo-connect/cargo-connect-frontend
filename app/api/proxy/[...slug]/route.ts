import { NextRequest, NextResponse } from 'next/server';
import { Agent } from 'undici';

// This is the agent that will bypass SSL certificate validation
// DANGER: Using rejectUnauthorized: false disables SSL certificate verification,
// which is a security risk. Only use this if you understand the implications
// and are connecting to a trusted server with a self-signed certificate.
const unsafeAgent = new Agent({
  connect: {
    rejectUnauthorized: false,
  },
});

async function handler(req: NextRequest, { params }: { params: { slug: string[] } }) {
  const internalApiTargetUrl = process.env.INTERNAL_API_TARGET_URL;

  if (!internalApiTargetUrl) {
    console.error('INTERNAL_API_TARGET_URL is not set.');
    return NextResponse.json({ error: 'Proxy configuration error.' }, { status: 500 });
  }

  // Reconstruct the path from the slug
  const slugPath = params.slug.join('/');
  const targetUrl = `${internalApiTargetUrl}/${slugPath}`;

  console.log(`Proxying request to: ${targetUrl}`);

  try {
    // Forward the request, including method, headers (filtering out Next.js specific ones), and body
    const headers = new Headers(req.headers);
    // Remove headers that might cause issues when proxying
    headers.delete('host');
    headers.delete('connection');
    // Vercel adds its own x-forwarded-host, so let the backend see the original if it was there, or none
    // headers.delete('x-forwarded-host');
    // headers.delete('x-forwarded-proto');
    // headers.delete('x-forwarded-for');


    const backendResponse = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
      // @ts-ignore // undici Agent is compatible with Node's fetch dispatcher
      dispatcher: unsafeAgent,
      redirect: 'manual', // Handle redirects manually if needed, or follow them
    });

    // Forward the response from the backend
    const responseHeaders = new Headers(backendResponse.headers);
    // Clean up any hop-by-hop headers from the backend response
    responseHeaders.delete('transfer-encoding');
    responseHeaders.delete('connection');
    
    // Ensure cookies are proxied correctly
    // Vercel might handle this, but good to be explicit if issues arise
    // responseHeaders.forEach((value, key) => {
    //   if (key.toLowerCase() === 'set-cookie') {
    //     // Potentially modify cookie attributes if needed (e.g., Domain, Secure, HttpOnly)
    //   }
    // });

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Error in proxy request:', error);
    let errorMessage = 'Proxy request failed.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: 'Proxy request failed', details: errorMessage }, { status: 502 }); // Bad Gateway
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const HEAD = handler;
export const OPTIONS = handler;
