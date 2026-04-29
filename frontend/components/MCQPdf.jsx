import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

/*
  🎯 Styles for PDF layout
*/
const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontSize: 11,
    display: "flex",
    flexDirection: "column"
  },

  header: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "1px solid #000"
  },

  testName: {
    fontSize: 16,
    fontWeight: "bold"
  },

  meta: {
    fontSize: 10,
    marginTop: 5
  },

  box: {
    padding: 12,
    border: "1px solid #000",
    borderRadius: 5
  },

  subject: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 5
  },

  question: {
    fontSize: 13,
    marginBottom: 8
  },

  option: {
    marginBottom: 3
  },

  answer: {
    marginTop: 8,
    fontWeight: "bold",
    color: "green"
  },

  explanation: {
    marginTop: 6,
    fontSize: 10,
    fontStyle: "italic"
  }
});

const MCQPdf = ({ test, mcqs }) => {
  return (
    <Document>

      {/* 🔥 Each MCQ = 1 page */}
      {mcqs.map((mcq, index) => (
        <Page key={index} size="A4" style={styles.page}>
          {/* ================= HEADER ================= */}
          <View style={styles.header}>
            <Text style={styles.testName}>
              {test.test_name}
            </Text>

            <Text style={styles.meta}>
              Total MCQs: {mcqs.length}
            </Text>
          </View>


          {/* ================= MCQ BOX ================= */}
          <View style={styles.box}>

            {/* Subject + Chapter */}
            <Text style={styles.subject}>
              Subject: {mcq.subject_name}
            </Text>

            {/* Question */}
            <Text style={styles.question}>
              {index + 1}. {mcq.question}
            </Text>

            {/* Options */}
            <Text style={styles.option}>A. {mcq.option_a}</Text>
            <Text style={styles.option}>B. {mcq.option_b}</Text>
            <Text style={styles.option}>C. {mcq.option_c}</Text>
            <Text style={styles.option}>D. {mcq.option_d}</Text>

            {/* Correct Answer */}
            <Text style={styles.answer}>
              Correct Answer: {mcq.correct_option}
            </Text>

            {/* Explanation */}
            <Text style={styles.explanation}>
              Explanation: {mcq.explanation}
            </Text>

          </View>

        </Page>
      ))}

    </Document>
  );
};

export default MCQPdf;