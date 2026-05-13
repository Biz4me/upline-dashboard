import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-title',
  weight: ['400', '500', '600', '700', '800']
})

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600']
})

export const metadata: Metadata = {
  title: 'Upline.ai — Coach Atlas',
  description: 'Plateforme de coaching MLM propulsée par Atlas IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
