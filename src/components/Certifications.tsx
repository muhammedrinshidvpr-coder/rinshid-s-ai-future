 import { motion } from 'framer-motion';
 import { useInView } from 'framer-motion';
 import { useRef } from 'react';
 import { Award, ExternalLink } from 'lucide-react';
 import certIITM from '@/assets/cert-iitm.jpg';
 import certUdemy from '@/assets/cert-udemy.jpg';
 
 const certifications = [
   {
     title: 'Advanced Prompt Engineering Certification',
     issuer: 'IIT Madras (IITM Pravartak)',
     description: 'Focused on advanced prompt design, LLM interaction, and applied AI problem-solving.',
     image: certIITM,
     featured: true,
   },
   {
     title: 'Classroom of Tomorrow: Using AI and ChatGPT',
     issuer: 'Udemy',
     description: 'Focused on practical AI use in education, teaching, and productivity.',
     image: certUdemy,
     featured: false,
   },
 ];
 
 const Certifications = () => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: '-100px' });
 
   return (
     <section id="certifications" className="section-padding" ref={ref}>
       <div className="container-custom">
         {/* Header */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="text-center max-w-3xl mx-auto mb-16"
         >
           <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
             Credentials
           </span>
           <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">
             Certifications & Credentials
           </h2>
           <p className="text-muted-foreground text-lg leading-relaxed">
             Professional certifications that strengthen my expertise in AI, prompt engineering, and practical AI applications.
           </p>
         </motion.div>
 
         {/* Certifications Grid */}
         <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * index, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className={`group ${cert.featured ? 'md:col-span-2' : ''}`}
              >
                <div
                  className={`h-full rounded-2xl bg-card border overflow-hidden transition-all duration-500 ease-out hover:shadow-xl ${
                    cert.featured
                      ? 'border-accent/40 shadow-glow'
                      : 'border-border/50 hover:border-accent/30'
                  }`}
                >
                 {/* Featured Badge */}
                 {cert.featured && (
                   <div className="bg-gradient-to-r from-accent to-cyan-500 px-4 py-2 flex items-center justify-center gap-2">
                     <Award className="w-4 h-4 text-white" />
                     <span className="text-white text-sm font-medium">Featured Certification</span>
                   </div>
                 )}
 
                 <div className={`${cert.featured ? 'md:flex' : ''}`}>
                   {/* Certificate Image */}
                   <div
                     className={`relative overflow-hidden bg-secondary/30 ${
                       cert.featured ? 'md:w-3/5' : 'w-full'
                     }`}
                   >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                          cert.featured ? 'h-64 md:h-80' : 'h-48'
                        }`}
                      />
                     <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   </div>
 
                   {/* Content */}
                   <div
                     className={`p-6 ${
                       cert.featured ? 'md:w-2/5 md:flex md:flex-col md:justify-center' : ''
                     }`}
                   >
                     <div className="flex items-start gap-3 mb-3">
                       <div
                         className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                           cert.featured
                             ? 'bg-gradient-to-br from-accent/20 to-cyan-400/20'
                             : 'bg-secondary'
                         }`}
                       >
                         <Award
                           className={`w-5 h-5 ${
                             cert.featured ? 'text-accent' : 'text-muted-foreground'
                           }`}
                         />
                       </div>
                       <div>
                         <h3
                           className={`font-display font-semibold text-foreground leading-tight ${
                             cert.featured ? 'text-xl' : 'text-lg'
                           }`}
                         >
                           {cert.title}
                         </h3>
                         <p className="text-accent text-sm font-medium mt-1">{cert.issuer}</p>
                       </div>
                     </div>
 
                     <p className="text-muted-foreground text-sm leading-relaxed">
                       {cert.description}
                     </p>
                   </div>
                 </div>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default Certifications;