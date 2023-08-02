import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaBehance } from '@react-icons/all-files/fa/FaBehance';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import * as config from 'lib/config';
import * as React from 'react';
import styles from './styles.module.css';

export const FooterImpl: React.FC = () => {
//bg-neutral-100
  return (
    <footer style={{ backgroundImage: "radial-gradient(circle,rgba(16 18 27 / 30%), #27272a" }} className="bg-zinc-800 shadow-top flex flex-col items-center w-full p-4">
      <div className="max-w-[1100px] m-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center mx-auto my-2">
        {config.social.instagram && (
          <a
            className="mr-4"
            href={config.social.instagram}
            title={`Instagram @duniakripto_ind`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram size={25} />
          </a>
        )}

        {config.social.behance && (
          <a
            className="mr-4"
            href={config.social.behance}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaBehance size={25} />
          </a>
        )}
        {config.social.twitter && (
          <a
            className="mr-4"
            href={config.social.twitter}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter size={25} />
          </a>
        )}
        {config.social.facebook && (
            <a
            className="mr-4"
            href={config.social.facebook}
              target='_blank'
              rel='noopener noreferrer'
          >
            <FaFacebook size={25} />
            </a>
        )}
      </div>

        <div className="text-center text-zinc-400 text-sm">Copyright © 2016-2023 {config.author}.</div>
      </div>

    </footer>
  )
}
export const Footer = React.memo(FooterImpl)
