'use server';

export async function initGame() {
  console.log('initGame called');
  const res = await fetch(
    'https://a7f9941a11102027b10324cc2b7cf98aa7c3f2d2-3000.dstack-pha-prod7.phala.network/game/0/init',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'nextjs-client',
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }

  return res.json();
}
