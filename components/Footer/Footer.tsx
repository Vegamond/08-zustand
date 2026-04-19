import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      <div className={css.wrap}>
        <p>Developer: Oleksandr Karpytskyi</p>
        <p>
          Contact us:{' '}
          <a href="mailto:alexkarpytskyi@gmail.com">alexkarpytskyi@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}
