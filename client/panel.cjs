'use strict';

const React = require('react');
const { resolveLocalPreviewUrl } = require('./preview-url.cjs');
const h = React.createElement;

const shellStyle = {
  height: '100%', minHeight: 0, width: '100%', display: 'flex', flexDirection: 'column',
  color: 'var(--dsh-text-primary, #202124)', background: 'var(--dsh-background, #f7f7f5)',
  fontFamily: 'var(--dsh-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
};
const headerStyle = {
  padding: '20px 20px 14px', borderBottom: '1px solid rgba(127,127,127,.16)', flex: '0 0 auto',
};
const titleStyle = { margin: 0, fontSize: 17, lineHeight: 1.3, fontWeight: 650, letterSpacing: '-.02em' };
const captionStyle = { margin: '5px 0 0', fontSize: 12, opacity: .62 };
const formStyle = { padding: '14px 16px 10px', flex: '0 0 auto' };
const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, marginBottom: 7, opacity: .72 };
const rowStyle = { display: 'flex', gap: 8 };
const inputStyle = {
  minWidth: 0, flex: 1, height: 36, padding: '0 11px', borderRadius: 8,
  border: '1px solid rgba(127,127,127,.25)', background: 'var(--dsh-surface, #fff)',
  color: 'inherit', fontSize: 12, outline: 'none',
};
const buttonStyle = {
  flex: '0 0 auto', height: 36, padding: '0 13px', border: 0, borderRadius: 8,
  background: 'var(--dsh-accent, #202124)', color: 'var(--dsh-accent-contrast, #fff)',
  fontSize: 12, fontWeight: 600, cursor: 'pointer',
};
const helperStyle = { margin: '7px 0 0', fontSize: 11, lineHeight: 1.45, opacity: .57 };
const errorStyle = { margin: '6px 0 0', fontSize: 11, lineHeight: 1.45, color: '#b42318' };
const stageStyle = {
  position: 'relative', flex: 1, minHeight: 0, margin: '0 12px 12px',
  overflow: 'hidden', border: '1px solid rgba(127,127,127,.16)', borderRadius: 10,
  background: 'var(--dsh-surface, #fff)',
};
const emptyStyle = {
  height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
  alignItems: 'center', padding: 24, textAlign: 'center', boxSizing: 'border-box',
};
const footerStyle = {
  padding: '0 18px 12px', flex: '0 0 auto', fontSize: 10, lineHeight: 1.45, opacity: .52,
};

function DesignPanel() {
  const [address, setAddress] = React.useState('');
  const [preview, setPreview] = React.useState('');
  const [error, setError] = React.useState('');

  function openPreview(event) {
    event.preventDefault();
    try {
      const next = resolveLocalPreviewUrl(address);
      setPreview(next);
      setAddress(next);
      setError('');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '无法打开这个预览地址。');
    }
  }

  return h('main', { style: shellStyle, 'data-product-design-panel': '' },
    h('header', { style: headerStyle },
      h('h1', { style: titleStyle }, '产品设计面板'),
      h('p', { style: captionStyle }, '与左侧对话并排的原型预览工作区'),
    ),
    h('form', { style: formStyle, onSubmit: openPreview },
      h('label', { style: labelStyle, htmlFor: 'pd-local-preview-address' }, '本机预览地址'),
      h('div', { style: rowStyle },
        h('input', {
          id: 'pd-local-preview-address', type: 'text', inputMode: 'url', autoComplete: 'url',
          spellCheck: false, value: address, placeholder: 'http://localhost:5173',
          'aria-label': '本机预览地址', style: inputStyle,
          onChange: event => { setAddress(event.target.value); if (error) setError(''); },
        }),
        h('button', { type: 'submit', style: buttonStyle }, '打开预览'),
      ),
      h('p', { style: helperStyle }, '仅加载本机 localhost 地址；先在原型项目运行开发服务器。'),
      error ? h('p', { role: 'alert', style: errorStyle }, error) : null,
    ),
    h('section', { style: stageStyle, 'aria-label': '设计预览' },
      preview
        ? h('iframe', {
          key: preview, src: preview, title: '本机产品设计预览',
          sandbox: 'allow-scripts allow-forms allow-same-origin', referrerPolicy: 'no-referrer',
          style: { display: 'block', width: '100%', height: '100%', border: 0, background: '#fff' },
        })
        : h('div', { style: emptyStyle },
          h('div', { style: { fontSize: 14, fontWeight: 600 } }, '设计预览会显示在这里'),
          h('p', { style: { maxWidth: 300, margin: '8px 0 0', fontSize: 12, lineHeight: 1.55, opacity: .62 } },
            '在左侧聊天中描述并迭代设计；启动本机原型后，把 localhost 地址填到上方即可并排查看。'),
        ),
    ),
    h('footer', { style: footerStyle }, '运行 /product-design 后，此面板会自动打开；聊天内容仍留在左侧。'),
  );
}

module.exports = { DesignPanel };
