import React from "react";
import { TaskProps } from "../../../../types/task";
import { TheoryContent } from "../../../../interfaces/content";

const TheoryTask = ({ task }: TaskProps) => {
  const content = task.content as TheoryContent;

  return (
    <div className="theory-task p-4">
      {content.title && (
        <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
      )}
      {content.chapter && (
        <h3 className="text-xl font-semibold mb-3">{content.chapter}</h3>
      )}

      {content.sections?.map((section, idx) => (
        <section key={idx} className="mb-6">
          {section.heading && (
            <h4 className="text-lg font-semibold mb-2">{section.heading}</h4>
          )}

          {section.paragraphs?.map((para, i) => (
            <p key={i} className="mb-2 leading-relaxed">
              {para}
            </p>
          ))}

          {section.list && (
            <ul className="list-disc list-inside mb-2">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {section.image && (
            <img
              src={section.image.url}
              alt={section.image.alt ?? "Иллюстрация"}
              className="my-4 rounded shadow-md max-w-full"
            />
          )}
        </section>
      ))}

      {content.additional_info && (
        <aside className="bg-gray-100 dark:text-black p-4 rounded border border-gray-300">
          {content.additional_info.references && (
            <>
              <h5 className="font-semibold mb-2">Рекомендуемая литература:</h5>
              <ul className="list-disc list-inside mb-3">
                {content.additional_info.references.map((ref, i) => (
                  <li key={i}>{ref}</li>
                ))}
              </ul>
            </>
          )}

          {content.additional_info.glossary && (
            <>
              <h5 className="font-semibold mb-2">Глоссарий:</h5>
              <dl className="mb-3">
                {Object.entries(content.additional_info.glossary).map(
                  ([term, def], i) => (
                    <React.Fragment key={i}>
                      <dt className="font-semibold">{term}</dt>
                      <dd className="ml-4 mb-2">{def}</dd>
                    </React.Fragment>
                  )
                )}
              </dl>
            </>
          )}

          {content.additional_info.notes && (
            <p className="italic text-gray-700">
              {content.additional_info.notes}
            </p>
          )}

          {content.additional_info.related_topics && (
            <>
              <h5 className="font-semibold mt-4 mb-2">Связанные темы:</h5>
              <ul className="flex flex-wrap gap-2">
                {content.additional_info.related_topics.map((topic, i) => (
                  <li
                    key={i}
                    className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      )}
    </div>
  );
};

export default TheoryTask;
