package com.question.questionnaire.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.question.questionnaire.Model.MCQQuestion;
import com.question.questionnaire.Service.MCQQeustionService;

@Controller
public class MCQQuestionController {

    @Autowired
    private MCQQeustionService service;

    @GetMapping("/add-question")
    public String showAddQuestionForm(Model model) {
        model.addAttribute("mcqQuestion", new MCQQuestion());
        return "add-question";
    }

    @PostMapping("/add-question")
    public String addQuestion(@ModelAttribute("mcqQuestion") MCQQuestion mcqQuestion, Model model) {
        service.saveQuestion(mcqQuestion);
        model.addAttribute("message", "Question added successfully");
        model.addAttribute("mcqQuestion", new MCQQuestion()); // To clear the form after submission
        return "add-question";
    }

    @GetMapping("/{subjectCode}")
    public String getQuestionsBySubject(@PathVariable String subjectCode, Model model) {
        List<MCQQuestion> questions = service.getAllQuestionsBySubjectCode(subjectCode);
        model.addAttribute("questions", questions);
        model.addAttribute("subject", subjectCode); // Use subjectCode instead of subject
        return "question-list";
    }

    @DeleteMapping("/{subject}")
    public String deleteQuestionsBySubject(@PathVariable String subject) {
        service.deleteQuestionsBySubject(subject);
        return "redirect:/questions"; // Redirect to the question list
    }
}
