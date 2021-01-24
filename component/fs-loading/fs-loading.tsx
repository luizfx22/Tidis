import { motion, AnimatePresence } from 'framer-motion';
import { FC } from 'react';
import styles from './fs-loading.module.scss';

interface FullScreenLoadingProps {
  visible: boolean;
}

const FullScreenLoading: FC<FullScreenLoadingProps> = ({ visible }) => (
  <AnimatePresence>
    {visible && (
    <section className={styles.wrap}>
      <motion.div
        className={styles.circle_wrap}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.369,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className={styles.background_circle} />
          <div className={styles.foreground_circle} />
        </motion.div>
      </motion.div>
    </section>
    )}
  </AnimatePresence>
);

export default FullScreenLoading;
