'use strict';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

/** Normalize a local preview URL, rejecting non-local origins and credentials. */
function resolveLocalPreviewUrl(value) {
  const raw = String(value ?? '').trim();
  if (!raw) throw new Error('请输入本机预览地址。');

  let url;
  try {
    url = new URL(/^https?:\/\//iu.test(raw) ? raw : `http://${raw}`);
  } catch {
    throw new Error('地址格式无效，请填写 localhost 预览地址。');
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('预览仅支持 HTTP 或 HTTPS 地址。');
  }
  if (!LOCAL_HOSTS.has(url.hostname.toLowerCase())) {
    throw new Error('为了安全，面板目前只加载 localhost、127.0.0.1 或 ::1 本机预览。');
  }
  if (url.username || url.password) {
    throw new Error('本机预览地址不能包含用户名或密码。');
  }
  return url.href;
}

module.exports = { resolveLocalPreviewUrl };
