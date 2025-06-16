// src/pages/database-schema-management/index.jsx
import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

const DatabaseSchemaManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['database', 'tables']));
  const [queryResult, setQueryResult] = useState(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  // Mock database schema data
  const schema = {
    database: 'vendbot_production',
    tables: [
      {
        name: 'vending_machines',
        rowCount: 125,
        size: '2.3 MB',
        columns: [
          { name: 'id', type: 'VARCHAR(50)', nullable: false, key: 'PRIMARY' },
          { name: 'name', type: 'VARCHAR(255)', nullable: false, key: null },
          { name: 'location', type: 'VARCHAR(255)', nullable: false, key: null },
          { name: 'address', type: 'TEXT', nullable: true, key: null },
          { name: 'status', type: 'ENUM', nullable: false, key: null },
          { name: 'machine_type', type: 'VARCHAR(100)', nullable: false, key: null },
          { name: 'last_communication', type: 'TIMESTAMP', nullable: true, key: null },
          { name: 'coordinates_lat', type: 'DECIMAL(10,8)', nullable: true, key: null },
          { name: 'coordinates_lng', type: 'DECIMAL(11,8)', nullable: true, key: null },
          { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: null },
          { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: null }
        ],
        indexes: [
          { name: 'PRIMARY', columns: ['id'], type: 'BTREE', unique: true },
          { name: 'idx_status', columns: ['status'], type: 'BTREE', unique: false },
          { name: 'idx_location', columns: ['location'], type: 'BTREE', unique: false }
        ],
        relationships: [
          { table: 'machine_inventory', type: 'ONE_TO_MANY', foreignKey: 'machine_id' },
          { table: 'machine_transactions', type: 'ONE_TO_MANY', foreignKey: 'machine_id' }
        ]
      },
      {
        name: 'users',
        rowCount: 47,
        size: '456 KB',
        columns: [
          { name: 'id', type: 'INT', nullable: false, key: 'PRIMARY' },
          { name: 'name', type: 'VARCHAR(255)', nullable: false, key: null },
          { name: 'email', type: 'VARCHAR(255)', nullable: false, key: 'UNIQUE' },
          { name: 'password_hash', type: 'VARCHAR(255)', nullable: false, key: null },
          { name: 'role', type: 'VARCHAR(100)', nullable: false, key: null },
          { name: 'department', type: 'VARCHAR(100)', nullable: true, key: null },
          { name: 'status', type: 'ENUM', nullable: false, key: null },
          { name: 'last_login', type: 'TIMESTAMP', nullable: true, key: null },
          { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: null },
          { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: null }
        ],
        indexes: [
          { name: 'PRIMARY', columns: ['id'], type: 'BTREE', unique: true },
          { name: 'idx_email', columns: ['email'], type: 'BTREE', unique: true },
          { name: 'idx_role', columns: ['role'], type: 'BTREE', unique: false }
        ],
        relationships: [
          { table: 'user_sessions', type: 'ONE_TO_MANY', foreignKey: 'user_id' },
          { table: 'audit_logs', type: 'ONE_TO_MANY', foreignKey: 'user_id' }
        ]
      },
      {
        name: 'machine_inventory',
        rowCount: 3421,
        size: '8.7 MB',
        columns: [
          { name: 'id', type: 'INT', nullable: false, key: 'PRIMARY' },
          { name: 'machine_id', type: 'VARCHAR(50)', nullable: false, key: 'FOREIGN' },
          { name: 'product_name', type: 'VARCHAR(255)', nullable: false, key: null },
          { name: 'current_stock', type: 'INT', nullable: false, key: null },
          { name: 'max_capacity', type: 'INT', nullable: false, key: null },
          { name: 'price', type: 'DECIMAL(10,2)', nullable: false, key: null },
          { name: 'last_restock', type: 'TIMESTAMP', nullable: true, key: null },
          { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: null },
          { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: null }
        ],
        indexes: [
          { name: 'PRIMARY', columns: ['id'], type: 'BTREE', unique: true },
          { name: 'idx_machine_id', columns: ['machine_id'], type: 'BTREE', unique: false },
          { name: 'idx_stock_level', columns: ['current_stock'], type: 'BTREE', unique: false }
        ],
        relationships: [
          { table: 'vending_machines', type: 'MANY_TO_ONE', foreignKey: 'machine_id' }
        ]
      },
      {
        name: 'transactions',
        rowCount: 15678,
        size: '45.2 MB',
        columns: [
          { name: 'id', type: 'INT', nullable: false, key: 'PRIMARY' },
          { name: 'machine_id', type: 'VARCHAR(50)', nullable: false, key: 'FOREIGN' },
          { name: 'product_name', type: 'VARCHAR(255)', nullable: false, key: null },
          { name: 'amount', type: 'DECIMAL(10,2)', nullable: false, key: null },
          { name: 'payment_method', type: 'VARCHAR(50)', nullable: false, key: null },
          { name: 'transaction_status', type: 'ENUM', nullable: false, key: null },
          { name: 'transaction_time', type: 'TIMESTAMP', nullable: false, key: null },
          { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: null }
        ],
        indexes: [
          { name: 'PRIMARY', columns: ['id'], type: 'BTREE', unique: true },
          { name: 'idx_machine_id', columns: ['machine_id'], type: 'BTREE', unique: false },
          { name: 'idx_transaction_time', columns: ['transaction_time'], type: 'BTREE', unique: false },
          { name: 'idx_amount', columns: ['amount'], type: 'BTREE', unique: false }
        ],
        relationships: [
          { table: 'vending_machines', type: 'MANY_TO_ONE', foreignKey: 'machine_id' }
        ]
      }
    ],
    migrations: [
      {
        id: 'M001',
        name: 'create_vending_machines_table',
        status: 'completed',
        executedAt: new Date('2024-01-15T10:30:00'),
        executionTime: '1.2s'
      },
      {
        id: 'M002',
        name: 'add_coordinates_to_machines',
        status: 'completed',
        executedAt: new Date('2024-01-18T14:15:00'),
        executionTime: '0.8s'
      },
      {
        id: 'M003',
        name: 'create_users_table',
        status: 'completed',
        executedAt: new Date('2024-01-20T09:45:00'),
        executionTime: '0.5s'
      },
      {
        id: 'M004',
        name: 'add_inventory_tracking',
        status: 'pending',
        executedAt: null,
        executionTime: null
      }
    ]
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const executeQuery = () => {
    if (!sqlQuery.trim()) return;
    
    setIsExecuting(true);
    setQueryResult(null);
    
    // Simulate query execution
    setTimeout(() => {
      const isSelect = sqlQuery.toLowerCase().trim().startsWith('select');
      
      if (isSelect) {
        setQueryResult({
          type: 'select',
          rows: [
            { id: 1, name: 'Автомат #1', status: 'online', location: 'ТЦ Мега' },
            { id: 2, name: 'Автомат #2', status: 'warning', location: 'Офис Центр' },
            { id: 3, name: 'Автомат #3', status: 'offline', location: 'Бизнес центр' }
          ],
          executionTime: '145ms',
          rowCount: 3
        });
      } else {
        setQueryResult({
          type: 'modify',
          message: 'Query executed successfully',
          affectedRows: 1,
          executionTime: '89ms'
        });
      }
      
      setIsExecuting(false);
    }, 2000);
  };

  const getColumnIcon = (column) => {
    if (column.key === 'PRIMARY') return 'Key';
    if (column.key === 'FOREIGN') return 'Link';
    if (column.key === 'UNIQUE') return 'Hash';
    return 'Minus';
  };

  const getColumnIconColor = (column) => {
    if (column.key === 'PRIMARY') return 'text-warning';
    if (column.key === 'FOREIGN') return 'text-primary';
    if (column.key === 'UNIQUE') return 'text-accent';
    return 'text-text-muted';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-80' : 'lg:ml-80'} pt-16`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Управление схемой базы данных
              </h1>
              <p className="text-text-secondary">
                Мониторинг и управление структурой базы данных VendBot Manager
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <Icon name="Download" size={16} />
                <span>Экспорт схемы</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                <Icon name="Plus" size={16} />
                <span>Создать миграцию</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Таблиц в БД</p>
                  <p className="text-2xl font-bold text-text-primary">{schema.tables.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Database" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Общий размер</p>
                  <p className="text-2xl font-bold text-text-primary">56.7 MB</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="HardDrive" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Записей</p>
                  <p className="text-2xl font-bold text-text-primary">19,271</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Миграций</p>
                  <p className="text-2xl font-bold text-text-primary">{schema.migrations.length}</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="GitBranch" size={24} className="text-warning" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6">
            {/* Schema Tree - Left Panel (35%) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Структура базы данных
                  </h3>
                </div>
                <div className="p-4">
                  {/* Database Node */}
                  <div className="mb-4">
                    <button
                      onClick={() => toggleNode('database')}
                      className="flex items-center space-x-2 w-full text-left p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                    >
                      <Icon 
                        name={expandedNodes.has('database') ? 'ChevronDown' : 'ChevronRight'} 
                        size={16} 
                        className="text-text-muted"
                      />
                      <Icon name="Database" size={16} className="text-primary" />
                      <span className="font-medium text-text-primary">{schema.database}</span>
                    </button>
                    
                    {expandedNodes.has('database') && (
                      <div className="ml-6 mt-2">
                        <button
                          onClick={() => toggleNode('tables')}
                          className="flex items-center space-x-2 w-full text-left p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                        >
                          <Icon 
                            name={expandedNodes.has('tables') ? 'ChevronDown' : 'ChevronRight'} 
                            size={16} 
                            className="text-text-muted"
                          />
                          <Icon name="Table" size={16} className="text-accent" />
                          <span className="text-text-primary">Tables ({schema.tables.length})</span>
                        </button>
                        
                        {expandedNodes.has('tables') && (
                          <div className="ml-6 mt-2 space-y-1">
                            {schema.tables.map(table => (
                              <button
                                key={table.name}
                                onClick={() => setSelectedTable(table)}
                                className={`flex items-center justify-between w-full text-left p-2 rounded-lg transition-colors duration-200 ${
                                  selectedTable?.name === table.name
                                    ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-primary'
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <Icon name="Table" size={14} />
                                  <span className="text-sm">{table.name}</span>
                                </div>
                                <div className="text-xs text-text-muted">
                                  {table.rowCount}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Migration History */}
              <div className="bg-surface rounded-lg border border-border mt-6">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    История миграций
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {schema.migrations.map(migration => (
                    <div key={migration.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          migration.status === 'completed' ? 'bg-success' : 'bg-warning'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{migration.id}</p>
                          <p className="text-xs text-text-muted">{migration.name}</p>
                        </div>
                      </div>
                      <div className="text-xs text-text-secondary">
                        {migration.executionTime || 'Pending'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Definition Editor - Center Section (45%) */}
            <div className="col-span-12 lg:col-span-5">
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    {selectedTable ? `Таблица: ${selectedTable.name}` : 'Определение таблицы'}
                  </h3>
                </div>
                <div className="p-6">
                  {selectedTable ? (
                    <div className="space-y-6">
                      {/* Table Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1">
                            Название таблицы
                          </label>
                          <input
                            type="text"
                            value={selectedTable.name}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-secondary-50"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1">
                            Количество записей
                          </label>
                          <input
                            type="text"
                            value={selectedTable.rowCount.toLocaleString()}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-secondary-50"
                            readOnly
                          />
                        </div>
                      </div>

                      {/* Columns */}
                      <div>
                        <h4 className="text-md font-semibold text-text-primary mb-3">Столбцы</h4>
                        <div className="space-y-2">
                          {selectedTable.columns.map((column, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                              <Icon 
                                name={getColumnIcon(column)} 
                                size={16} 
                                className={getColumnIconColor(column)}
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-text-primary">{column.name}</span>
                                  <span className="text-sm text-text-secondary">{column.type}</span>
                                  {!column.nullable && (
                                    <span className="text-xs bg-error-100 text-error px-2 py-0.5 rounded-full">
                                      NOT NULL
                                    </span>
                                  )}
                                  {column.key && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                      column.key === 'PRIMARY' ? 'bg-warning-100 text-warning' :
                                      column.key === 'FOREIGN'? 'bg-primary-100 text-primary' : 'bg-accent-100 text-accent'
                                    }`}>
                                      {column.key}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Indexes */}
                      <div>
                        <h4 className="text-md font-semibold text-text-primary mb-3">Индексы</h4>
                        <div className="space-y-2">
                          {selectedTable.indexes.map((index, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Icon name="Database" size={16} className="text-accent" />
                                <div>
                                  <span className="font-medium text-text-primary">{index.name}</span>
                                  <div className="text-sm text-text-secondary">
                                    {index.columns.join(', ')} • {index.type}
                                  </div>
                                </div>
                              </div>
                              {index.unique && (
                                <span className="text-xs bg-accent-100 text-accent px-2 py-0.5 rounded-full">
                                  UNIQUE
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <Icon name="Table" size={48} className="text-text-muted mx-auto mb-4" />
                        <p className="text-text-secondary">Выберите таблицу для просмотра определения</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Query Console - Right Panel (20%) */}
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-surface rounded-lg border border-border mb-6">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Консоль запросов
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <textarea
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      placeholder="SELECT * FROM vending_machines WHERE status = 'online';"
                      className="w-full h-32 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                    />
                  </div>
                  <button
                    onClick={executeQuery}
                    disabled={!sqlQuery.trim() || isExecuting}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isExecuting ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      <Icon name="Play" size={16} />
                    )}
                    <span>{isExecuting ? 'Выполняется...' : 'Выполнить'}</span>
                  </button>
                </div>
              </div>

              {/* Query Results */}
              {queryResult && (
                <div className="bg-surface rounded-lg border border-border mb-6">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      Результат запроса
                    </h3>
                  </div>
                  <div className="p-4">
                    {queryResult.type === 'select' ? (
                      <div className="space-y-3">
                        <div className="text-sm text-text-secondary">
                          {queryResult.rowCount} строк за {queryResult.executionTime}
                        </div>
                        <div className="space-y-2">
                          {queryResult.rows.map((row, index) => (
                            <div key={index} className="p-2 bg-secondary-50 rounded text-xs font-mono">
                              {Object.entries(row).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-text-muted">{key}:</span>
                                  <span className="text-text-primary">{value}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-success">
                          {queryResult.message}
                        </div>
                        <div className="text-xs text-text-secondary">
                          Затронуто строк: {queryResult.affectedRows}
                        </div>
                        <div className="text-xs text-text-secondary">
                          Время выполнения: {queryResult.executionTime}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Метрики производительности
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">Активные соединения</span>
                      <span className="text-text-primary font-medium">12/100</span>
                    </div>
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">Использование CPU</span>
                      <span className="text-text-primary font-medium">34%</span>
                    </div>
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '34%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">Использование памяти</span>
                      <span className="text-text-primary font-medium">67%</span>
                    </div>
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DatabaseSchemaManagement;