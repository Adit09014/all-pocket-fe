import * as React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Header } from '../../Components/Headers';

export const Faq = () => {
  const theme = useTheme();

  const faqs = [
    {
      question: 'What is this website about?',
      answer:
        'This website helps you manage your personal finances — including accounts, investments, budgets, expenses, debts, and reminders — all in one place.',
    },
    {
      question: 'How do I add my income or expenses?',
      answer:
        'Simply navigate to the "Accounts" or "Expenses" section in the sidebar and click the “Add” button to input your transaction details.',
    },
    {
      question: 'Can I set limits for my spending?',
      answer:
        'Yes! You can create budgets with spending limits. The app automatically tracks your spending in each category and alerts you when limits are approached.',
    },
    {
      question: 'Is my data safe?',
      answer:
        'Absolutely. All your data is securely stored in a protected backend database and is accessible only to you.',
    },
    {
      question: 'Can I manage both debts and money I’ve lent?',
      answer:
        'Yes, the app includes separate modules for "Debt" (what you owe) and "Lent" (what others owe you), allowing you to track repayments easily.',
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="FAQs"
        subtitle="Frequently Asked Questions about the Finance Manager"
      />

      <Box mt={3}>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2, borderRadius: '8px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                fontSize="16px"
                color={theme.palette.text.primary}
              >
                {index + 1}. {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
