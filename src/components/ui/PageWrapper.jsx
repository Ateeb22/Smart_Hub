// src/components/ui/PageWrapper.jsx
import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/animations";

const PageWrapper = ({ children }) => {
  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
};

export default PageWrapper;
