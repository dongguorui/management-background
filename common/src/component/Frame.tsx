import React, { useState } from 'react';
import { ConfigProvider, Spin, Layout, Popover } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import emptyimg from '../assets/empty.svg';
import touxiang from '../assets/touxiang.svg';
import MenuList from './MenuList';
import cssstyle from './frame.less';
import { Link } from 'umi';
const { Sider, Content, Header } = Layout;

const Frame: React.FC = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userpop, setUserpop] = useState<any>();

  //组件空状态
  const customizeRenderEmpty = () => (
    <div style={{ position: 'relative', textAlign: 'center', minHeight: 300 }}>
      <img style={{ maxWidth: '100%' }} src={emptyimg} alt="" />
      <p style={{ width: '100%', position: 'absolute', top: 260, left: 0 }}>
        暂无数据
      </p>
    </div>
  );

  let style1 = props.project_icon
    ? { backgroundImage: `url(${props.project_icon})` }
    : undefined;
  let style2 = props.project_small_icon
    ? { backgroundImage: `url(${props.project_small_icon})` }
    : undefined;
  const titlelogo = (
    <div className={cssstyle.logo_title_container}>
      <div
        className={`${cssstyle.logo_container} ${cssstyle.big}${
          collapsed ? ` ${cssstyle.logo_hide}` : ''
        }`}
        style={style1}
      />
      <div
        className={`${cssstyle.logo_container} ${cssstyle.small}${
          collapsed ? '' : ` ${cssstyle.logo_hide}`
        }`}
        style={style2}
      />
    </div>
  );
  let usercontent: any;
  if (props.userinfo) {
    let list = [];
    if (props.usermenus) {
      for (let i = 0; i < props.usermenus.length; i++) {
        let menu = props.usermenus[i];
        let menuitemview: {};
        if (menu.click) {
          menuitemview = (
            <a
              disabled={menu.disabled}
              onClick={() => {
                setUserpop(false);
                menu.click && menu.click();
              }}
              style={{ color: menu.disabled ? '#ccc' : '#000' }}
            >
              <span style={{ fontSize: '10px', marginLeft: '8px' }}>
                {menu.label}
              </span>
            </a>
          );
        } else if (menu.link) {
          console.log(`menu link:${menu.link}`);
          menuitemview = (
            <Link
              to={menu.link}
              onClick={() => {
                setUserpop(false);
              }}
              style={{ color: '#000' }}
            >
              <span style={{ fontSize: '10px', marginLeft: '8px' }}>
                {menu.label}
              </span>
            </Link>
          );
        }
        list.push(
          <div
            key={i + 1}
            className="winsense-item-select winsense-center-container"
            style={{ width: 98, height: 40 }}
          >
            <span
              className={`${cssstyle['user-menu-icon']} ${menu.iconclass}`}
            />
            {menuitemview}
          </div>,
        );
      }
    }
    list.push(
      <div
        key={0}
        className="winsense-item-select winsense-center-container"
        style={{ width: 98, height: 40 }}
      >
        <a onClick={props.logout} style={{ color: '#000' }}>
          <span className={`${cssstyle['user-menu-icon']} ${cssstyle.quit}`} />
          <span style={{ fontSize: '10px', marginLeft: '8px' }}>退出登录</span>
        </a>
      </div>,
    );
    const content = <div>{list}</div>;

    usercontent = (
      <Popover
        visible={userpop}
        onVisibleChange={(visible: any) => {
          setUserpop(visible);
        }}
        placement="bottom"
        content={content}
      >
        <a
          className={`${
            cssstyle.triangle_border_down
          } winsense-menu-item-color ${userpop ? ` ${cssstyle.pop}` : ''}`}
          style={{ margin: 'auto 8px', lineHeight: '24px' }}
        >
          {props.userinfo.fullname}
        </a>
      </Popover>
    );
  } else {
    usercontent = (
      <span
        className={
          cssstyle.triangle_border_down + (userpop ? ` ${cssstyle.pop}` : '')
        }
        style={{ color: '#fff', margin: '0px 8px' }}
      >
        游客
      </span>
    );
  }

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty} locale={zhCN}>
      <Spin spinning={loading || !!props.logoutloading}>
        <Layout
          style={{ minHeight: '100vh', overflowX: 'auto', overflowY: 'hidden' }}
        >
          <Sider
            className={`beibei-frame-bg ${cssstyle.menubar}`}
            collapsible
            trigger={null}
            collapsedWidth="50"
            onCollapse={(collapsed) => {
              setCollapsed(collapsed);
            }}
            collapsed={collapsed}
          >
            <div>
              <div className={cssstyle['header-root']}>{titlelogo}</div>
              <div
                style={{
                  height: 2,
                  backgroundColor: '#fff',
                  margin: '0px 12px 15px 12px',
                }}
              />
              <div className={cssstyle['menubar-content']}>
                <MenuList
                  menuData={props.menulist}
                  router={props.router}
                  changeNotify={props.menuChangeNotify}
                  isCollapsed={collapsed}
                  egnores={props.menu_egnore}
                />
              </div>
              <div
                className={`${cssstyle['menubar-trigger']} ${
                  collapsed
                    ? `beibei-frame-bg ${cssstyle.expends}`
                    : cssstyle.thrink
                }`}
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              />
            </div>
          </Sider>
          <Content
            className={`beibei-frame-contant-color ${cssstyle.content_container}`}
            style={{
              minWidth: props.minWidth ? `${props.minWidth}px` : '1390px',
            }}
          >
            <Header className={`beibei-frame-header-bg ${cssstyle.header}`}>
              <div style={{ flexGrow: 1 }}>{props.titlecontent}</div>
              <div>{props.otherlist}</div>
              <div
                className="beibei-center-container"
                style={{
                  minWidth: 139,
                  padding: '0px 30px 0px 0px',
                  height: '100%',
                }}
              >
                <div
                  className={`${cssstyle['devide-vertial']} beibei-frame-bg`}
                />
                <img src={touxiang} alt="" />
                {usercontent}
              </div>
            </Header>
            <Content>{props.children}</Content>
          </Content>
        </Layout>
      </Spin>
    </ConfigProvider>
  );
};

export default Frame;
