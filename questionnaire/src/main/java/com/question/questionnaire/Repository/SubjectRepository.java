package com.question.questionnaire.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.question.questionnaire.Model.Subjects;

@Repository
public interface SubjectRepository extends MongoRepository<Subjects, String> {

    @Aggregation(pipeline = {
            "{ $lookup: { from: 'questions', localField: 'subjectCode', foreignField: 'subjectCode', as: 'questions' } }",
            "{ $unwind: { path: '$questions', preserveNullAndEmptyArrays: true } }",
            "{ $group: { _id: { subject: '$subject', subjectCode: '$subjectCode' }, totalQuestions: { $sum: 1 } } }",
            "{ $project: { subject: '$_id.subject', subjectCode: '$_id.subjectCode', totalQuestions: 1, _id: 0 } }"
    })
    List<Subjects> findDistinctSubjectsAndCodesWithQuestionCount();
}
