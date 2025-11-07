import { motion } from "framer-motion";

const Section = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.3 }}
    className={`my-20 ${className}`}
  >
    {children}
  </motion.div>
);

export default Section;
