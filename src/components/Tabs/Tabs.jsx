// components/Tabs/Tabs.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const Tabs = ({ tabs, activeTabId, onTabSelected }) => {
  // Перевіряємо чи activeTabId є правильним
  const correctedActiveTabId = tabs.some(tab => tab.id === activeTabId)
    ? activeTabId
    : tabs[0].id; // Якщо активний таб не знайдено, встановлюємо перший таб за замовчуванням

  const handleTabClick = (e, tabId) => {
    e.preventDefault(); // Запобігаємо перезавантаженню сторінки
    if (tabId !== correctedActiveTabId) {
      onTabSelected(tabId); // Викликаємо onTabSelected для неактивного табу
    }
  };

  // Знаходимо активний таб
  const activeTab = tabs.find(tab => tab.id === correctedActiveTabId);
  const activeTabContent = activeTab ? activeTab.content : ''; // Виводимо контент активного табу

  return (
    <div className="tabs is-boxed" data-cy="TabsComponent">
      <ul>
        {tabs.map(tab => (
          <li
            key={tab.id}
            className={tab.id === correctedActiveTabId ? 'is-active' : ''}
            data-cy="Tab"
          >
            <a
              href={`#${tab.id}`}
              data-cy="TabLink"
              onClick={e => handleTabClick(e, tab.id)}
            >
              {tab.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Виведення контенту активного табу тут */}
      <div className="tabs-content" data-cy="TabContent">
        {/* Для виведення тексту знизу можна використовувати стилі */}
        <div className="tabs-content-text">{activeTabContent}</div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
  activeTabId: PropTypes.string.isRequired,
  onTabSelected: PropTypes.func.isRequired,
};
